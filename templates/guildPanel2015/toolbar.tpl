<menu type="toolbar" id="main-toolbar" class="toolbar">
	<!-- <li data-linkName="telegram">
		<i class="fa fa-2x fa-paper-plane"></i>
	</li>
	<li data-linkName="duckduck">
		<i class="fa fa-2x fa-search"></i>
	</li>
	<li data-linkName="disclaimer">
		<i class="fa fa-2x fa-exclamation-triangle"></i>
	</li> -->
	{foreach $hookMenu as $moduleList}
		{if is_array($moduleList)}
		<li data-linkName="{$moduleList.linkName}">
			<i class="{$moduleList.icoClass} fa-fw"></i>
			{if isset($moduleList.otherOption)}$moduleList.otherOption{/if}
		</li>
		{else}
			{$moduleList}
		{/if}
	{/foreach}
	<!--Here you can hook your module toolbar-->
</menu>
