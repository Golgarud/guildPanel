<?php
/**
 * Duckduck Go search
 *
 * @author Jiedara
 * @package GuildPanel
 * @subpackage Module
 */
class Duckduck extends Module
{
	protected $isActive = true;
	protected $moduleName = "Duckduck"; //UNIQUE module name (or key)

	public function __construct()
	{
		// enable or disable module
		$this->setIsActive( 1 );
	}


	// run in <head> (header.tpl)
	public function hookHead()
	{
		return '<link rel="stylesheet" href="modules/duckduck/css/style.css" >';
	}

	// run in <header> (header.tpl)
	public function hookHeader()
	{
		return '
		<form method="get" id="search" class="search-wrapper cf" target="_blank" action="http://duckduckgo.com/">
					<input type="hidden" name="ka" value="h" />
					<input type="hidden" name="k7" value="#fafafa" />
					<input type="hidden" name="kj" value="#3f3f3f" />
					<input type="hidden" name="ky" value="#fafafa" />
					<input type="hidden" name="kx" value="b" />
					<input type="hidden" name="kt" value="Helvetica" />
					<input type="text" name="q" maxlength="255" placeholder="Rechercher" />
					<button type="submit">Vers L\'Internet !</button>
				</form>
		';
	}
}
