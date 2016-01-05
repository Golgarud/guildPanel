<main class="main" id="main">
	<ul id="main-board" class="board">
		{foreach $hookContent as $key => $module}
			{if is_array($module)}
				<li data-linkName="{if isset($module.linkName)}{$module.linkName}{/if}" class="module {if isset($module.class)}{$module.class}{/if}">
					<div class="module-content">{$module.content}</div>
					<ul class="module-option">
						{if $module.option}
						<li data-action="close">
							<i class="fa fa-close"></i> Fermer
						</li>
						<li data-action="fixed">
							<i class="fa fa-thumb-tack"></i> Fixer <span class="info">(soon)</span>
						</li>
						<li data-action="full">
							<i class="fa fa-arrows-alt"></i> Pleine page <span class="info">(soon)</span>
						</li>
						{if isset($module.config)}
							<li data-action="config">
								<i class="fa fa-cog"></i> Configurer <span class="info">(soon)</span>
							</li>
						{/if}
							{if isset($module.otherOption)}
								{$module.otherOption}
							{/if}
						{/if}
					</ul>
					{if isset($module.config)}
						<div class="configBoard">{$module.config}</div>
					{/if}
				</li>
			{else}
				{$module}
			{/if}
		{/foreach}

	</ul>

</main>
