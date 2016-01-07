<?php
/**
 * Duckduck Go search
 *
 * @author Jiedara
 * @package GuildPanel
 * @subpackage Module
 */
class Discord extends Module
{
	protected $isActive = true;
	protected $moduleName = "Discord"; //UNIQUE module name (or key)

	public function __construct()
	{
		// enable or disable module
		$this->setIsActive( 1 );
	}


	// run in module's tabs
	public function hookContent()
	{
		return array(
			'content' => '<iframe src="https://discordapp.com/widget?id=133966883220226049&theme=dark" allowtransparency="true" frameborder="0"></iframe>',
			'class' => 'module-5h module-4w', // html class
			'option' => 1, // enable or disable user's options
			'linkName' => "Discord", // add data linkName (cool think for JS execution)
			'otherOption' => null // add specific user's options (html)
		);
	}

	// run in left menu (toolbar.tpl)
	public function hookMenu()
	{
		return array(
			'icoClass' => 'fa fa-2x fa-headphones', //icon html class
			'linkName' => "Discord", // add data linkName (cool think for JS execution)
			'otherOption' => null // add specific user's options (html)
		);
	}

	// run in foot
	public function hookFoot()
	{
		return "<script link='https://discordapp.com/api/servers/133966883220226049/widget.json'></script>";
	}
}
