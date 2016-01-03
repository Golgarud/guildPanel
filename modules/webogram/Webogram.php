<?php
/**
 * Webogram
 *
 * @package GuildPanel
 * @subpackage Module
 */
class Webogram extends Module
{
	protected $isActive = true;

	public function __construct()
	{
		$this->setIsActive( 1 );
		print_r($this);
	}

	public function hookDebug()
	{
		return print_r($this, 1);
	}

	public function hookContent()
	{
		return array(
			'content' => 'test',
			'class' => 'test',
			'option' => 'test',
		);
	}
}
