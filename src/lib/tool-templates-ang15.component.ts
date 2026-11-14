import {
	AfterViewInit,
	Component,
	TemplateRef,
	ViewChild,
	inject,
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
export class ToolTemplatesAng15Component implements AfterViewInit {
	private registry = inject(TemplateRegistryService);

	@ViewChild('userCard', { static: true }) userCard!: TemplateRef<any>;
	@ViewChild('emptyState', { static: true }) emptyState!: TemplateRef<void>;
	@ViewChild('loading', { static: true }) loading!: TemplateRef<void>;

	ngAfterViewInit(): void {
		this.registry.register('userCard', this.userCard);
		this.registry.register('emptyState', this.emptyState);
		this.registry.register('loading', this.loading);
	}
}
