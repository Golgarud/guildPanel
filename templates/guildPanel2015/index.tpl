<main class="main" id="main">
	<div id="main-board" class="board">
		{foreach $hookContent as $key => $module}
			{if is_array($module)}
				<div data-linkName="{if isset($module.linkName)}{$module.linkName}{/if}" class="module {if isset($module.class)}{$module.class}{/if}">
					<div class="module-content">{$module.content}</div>
					<div class="module-option">
						{if $module.option}
						<i class="fa fa-close"></i>
						<i class="fa fa-thumb-tack"></i>
						<i class="fa fa-arrows"></i>
							{if isset($module.otherOption)}
								{$module.otherOption}
							{/if}
						{/if}
					</div>
				</div>
			{else}
				{$module}
			{/if}
		{/foreach}
		<!-- <div data-linkName="disclaimer" class="module module-disclaimer">
			<div class="module-content">
				<h2>Site preview !</h2>
				<p>C'est encore la version test de GuildPanel</p>
				<p><a href="https://github.com/Golgarud/guildPanel">Le GitHub</a></p>
			</div>
			<div class="module-option">
				<i class="fa fa-close"></i>
				<i class="fa fa-thumb-tack"></i>
				<i class="fa fa-arrows"></i>
			</div>
		</div>
		<div class="module">
			<div class="module-content">Module2</div>
			<div class="module-option">
				<i class="fa fa-close"></i>
				<i class="fa fa-thumb-tack"></i>
				<i class="fa fa-arrows"></i>
			</div>
		</div>
		<div class="module module-2h">
			<div class="module-content">Coucou c'est Poec le meilleur de la terre</div>
			<div class="module-option">
				<i class="fa fa-close"></i>
				<i class="fa fa-thumb-tack"></i>
				<i class="fa fa-arrows"></i>
			</div>
		</div>
		<div class="module module-2h module-3w">
			<div class="module-content">Module2h3w</div>
			<div class="module-option">
				<i class="fa fa-close"></i>
				<i class="fa fa-thumb-tack"></i>
				<i class="fa fa-arrows"></i>
			</div>
		</div>
		<div data-linkName="duckduck" class="module module-4w">
			<div class="module-content">
				<form method="get" id="search" class="search-wrapper cf" target="_blank" action="http://duckduckgo.com/">
					<input type="hidden" name="sites" value="hardikpandya.com" />
					<input type="hidden" name="ka" value="h" />
					<input type="hidden" name="k7" value="#fafafa" />
					<input type="hidden" name="kj" value="#3f3f3f" />
					<input type="hidden" name="ky" value="#fafafa" />
					<input type="hidden" name="kx" value="b" />
					<input type="hidden" name="kt" value="Helvetica" />
					<input type="text" name="q" maxlength="255" placeholder="Rechercher" />
					<button type="submit">Vers L'Internet !</button>
				</form>
			</div>
			<div class="module-option">
				<i class="fa fa-close"></i>
				<i class="fa fa-thumb-tack"></i>
				<i class="fa fa-arrows"></i>
			</div>
		</div>
 -->

		<!--Here you can hook your module board-->
	</div>

</main>
