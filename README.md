# tool-templates-ang15

Библиотека переиспользуемых `ng-template` для Angular 15.
Позволяет один раз объявить набор шаблонов и использовать их в любом компоненте
приложения-потребителя через `TemplateRegistryService`.

## Установка

```bash
npm install tool-templates-ang15
```

Требуется Angular 15.2+ (`@angular/core`, `@angular/common` — peer dependencies).

## Как это работает

1. Компонент `ToolTemplatesAng15Component` содержит набор `<ng-template>`
   (`userCard`, `emptyState`, `loading`) и при инициализации регистрирует их
   в singleton-сервисе `TemplateRegistryService`.
2. Сервис хранит `TemplateRef` по строковому ключу.
3. Любой компонент приложения инжектит `TemplateRegistryService` и рендерит
   нужный шаблон через `*ngTemplateOutlet`, передавая контекст.

## Подключение

### 1. Импортируйте модуль

```ts
import { ToolTemplatesAng15Module } from 'tool-templates-ang15';

@NgModule({
  imports: [
    // ...
    ToolTemplatesAng15Module,
  ],
})
export class AppModule {}
```

Для standalone-приложения импортируйте компонент напрямую:

```ts
import { ToolTemplatesAng15Component } from 'tool-templates-ang15';

@Component({
  standalone: true,
  imports: [ToolTemplatesAng15Component],
  // ...
})
export class AppComponent {}
```

### 2. Отрендерите контейнер один раз в корне приложения

```html
<!-- app.component.html -->
<lib-tool-templates-ang15 />
<router-outlet />
```

> **Важно:** компонент должен быть отрендерен, иначе его `ngAfterViewInit`
> не выполнится и шаблоны не попадут в реестр. Ставьте его **до** `<router-outlet>`.

## Использование

```ts
import { Component, inject } from '@angular/core';
import { TemplateRegistryService } from 'tool-templates-ang15';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  tpl = inject(TemplateRegistryService);
  users = [{ name: 'Иван' }, { name: 'Мария' }];
}
```

```html
<h3>Заказы</h3>

<ng-container *ngFor="let u of users">
  <ng-container
    *ngTemplateOutlet="tpl.get('userCard'); context: { $implicit: u }">
  </ng-container>
</ng-container>

<ng-container *ngIf="tpl.get('emptyState') as empty">
  <ng-container *ngTemplateOutlet="empty"></ng-container>
</ng-container>
```

### Доступные ключи шаблонов

| Ключ | Контекст | Описание |
|---|---|---|
| `userCard` | `$implicit: { name: string }` | Карточка пользователя |
| `emptyState` | — | Заглушка «Ничего нет» |
| `loading` | — | Индикатор загрузки |

### API `TemplateRegistryService`

| Метод | Возвращает | Описание |
|---|---|---|
| `register(key, tpl)` | `void` | Регистрирует шаблон (вызывается библиотекой) |
| `get(key)` | `TemplateRef \| null` | Возвращает шаблон или `null`, если ещё не зарегистрирован |
| `has(key)` | `boolean` | Проверяет наличие шаблона |

## Стили

CSS-классы, объявленные в `ToolTemplatesAng15Component` (например, `.card`),
компилируются вместе с компонентом и автоматически доступны в приложении
благодаря `ViewEncapsulation.Emulated`. Дополнительных действий не требуется.

## Разработка

### Сборка

```bash
ng build tool-templates-ang15
```

Артефакты попадают в `dist/tool-templates-ang15`.

### Публикация

```bash
ng build tool-templates-ang15
cd dist/tool-templates-ang15
npm publish
```

### Тесты

```bash
ng test tool-templates-ang15
```

### Генерация кода

```bash
ng generate component component-name --project tool-templates-ang15
ng generate service service-name --project tool-templates-ang15
```

## Лицензия

MIT
