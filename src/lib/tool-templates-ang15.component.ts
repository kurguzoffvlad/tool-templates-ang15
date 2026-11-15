import {
	AfterViewInit,
	Component,
	TemplateRef,
	ViewChild,
	inject, OnDestroy,
} from '@angular/core';
import { TemplateRegistryService } from './template-registry.service';

@Component({
	selector: 'lib-tool-templates-ang15',
	standalone: true,
	template: `
		<ng-template #userCard let-user>
			<div class="card">👤 {{ user.name }}</div>
		</ng-template>

		<ng-template #emptyState>
			<p>Ничего нет</p>
		</ng-template>

		<ng-template #loading>
			<p>Загрузка...</p>
		</ng-template>
	`,
	styles: [`
    .card {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      margin: 4px 0;
      font-family: sans-serif;
    }
  `],
})
export class ToolTemplatesAng15Component implements AfterViewInit, OnDestroy {
	private registry = inject(TemplateRegistryService);

	@ViewChild('userCard', { static: true }) userCard!: TemplateRef<unknown>;
	@ViewChild('emptyState', { static: true }) emptyState!: TemplateRef<void>;
	@ViewChild('loading', { static: true }) loading!: TemplateRef<void>;

	private get templates(): Record<string, TemplateRef<unknown>> {
		return {
			userCard: this.userCard,
			emptyState: this.emptyState,
			loading: this.loading,
		};
	}

	ngAfterViewInit(): void {
		Object.entries(this.templates).forEach(([key, tpl]) => {
			this.registry.register(key, tpl);
		});
	}

	/* Если не удалить шаблоны при уничтожении компонента, сборщик мусора не сможет очистить их из памяти. */
	ngOnDestroy(): void {
		this.registry.unregister(...Object.keys(this.templates));
	}
}
