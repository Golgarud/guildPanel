<?php
/**
 * Mumble
 *
 * @author Golga
 * @package GuildPanel
 * @subpackage Module
 */
class Mumble extends Module
{
	protected $isActive = true;
	protected $moduleName = "Mumble";

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
			'content' => '<iframe src="http://mumbleviewer.gotmumble.com/?id=27411&size=11&font=Verdana&color=000000&bgcolor=FFFFFF" scrolling="vertical" frameborder="0" style="-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;"></iframe>',
			'class' => 'module-2h module-3w',
			'linkName' => 'mumble',
			'option' => 1
		);
	}

	public function hookMenu()
	{
		return array(
			'icoClass' => 'fa fa-2x fa-microphone',
			'linkName' => 'mumble'
		);
	}
}
