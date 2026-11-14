import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TemplateRegistryService {
	private map = new Map<string, TemplateRef<any>>();

	register(key: string, tpl: TemplateRef<any>): void {
		this.map.set(key, tpl);
	}

	get(key: string): TemplateRef<any> {
		const tpl = this.map.get(key);
		if (!tpl) {
			throw new Error(`[TemplateRegistry] Шаблон "${key}" не зарегистрирован. ` +
				`Убедитесь, что <lib-tool-templates-ang15 /> отрендерен в приложении.`);
		}
		return tpl;
	}

	has(key: string): boolean {
		return this.map.has(key);
	}
}
