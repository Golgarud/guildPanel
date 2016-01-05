<?php
/**
 * Webogram
 *
 * @author Golga
 * @package GuildPanel
 * @subpackage Module
 */
class Webogram extends Module
{
	protected $moduleName = "Webogram";

	public function __construct()
	{
		$this->setIsActive( 1 );
	}

	public function hookDebug()
	{
		return print_r($this, 1);
	}

	public function hookContent()
	{
		return array(
			'content' => '<iframe width="400" height="400" src="' . MOD_DIR . '/webogram/index.html" ></iframe>',
			'class' => 'module-4h module-4w',
			'linkName' => 'telegram',
			'option' => 1
		);
	}

	public function hookMenu()
	{
		return array(
			'icoClass' => 'fa fa-2x fa-paper-plane',
			'linkName' => 'telegram'
		);
	}
}
