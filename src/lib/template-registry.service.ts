import { Injectable, TemplateRef } from '@angular/core';

export interface RegisterOptions {
	/** Перезаписать существующий шаблон. По умолчанию false — коллизия бросает ошибку. */
	overwrite?: boolean;
}

/** Реестр шаблонов (TemplateRef) по строковым ключам. */
@Injectable({ providedIn: 'root' })
export class TemplateRegistryService {
	private readonly map = new Map<string, TemplateRef<unknown>>();

	/** Регистрирует шаблон. Бросает ошибку, если ключ пустой или уже занят. */
	public register<C = unknown>(key: string, tpl: TemplateRef<C>, opts: RegisterOptions = {}): void {
		if (!key.trim()) {
			throw new Error('Template key must be a non-empty string');
		}
		if (!opts.overwrite && this.map.has(key)) {
			throw new Error(`Template "${key}" already registered`);
		}
		this.map.set(key, tpl as TemplateRef<unknown>);
	}

	/** Возвращает шаблон по ключу или бросает ошибку, если он не зарегистрирован. */
	public get<C = unknown>(key: string): TemplateRef<C> {
		const tpl = this.map.get(key);
		if (!tpl) {
			throw new Error(`Template "${key}" not registered`);
		}
		return tpl as TemplateRef<C>;
	}

	/** Проверяет наличие шаблона по ключу. */
	public has(key: string): boolean {
		return this.map.has(key);
	}

	/** Снимает регистрацию одного или нескольких шаблонов. */
	public unregister(...keys: string[]): void {
		keys.forEach((key) => this.map.delete(key));
	}
}
