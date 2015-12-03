<?php
/**
 * News
 *
 * @package GuildPanel
 * @subpackage Module
 */
class News extends Module
{
	protected $isActive = true;

	public function __construct()
	{
		$this->setIsActive( 1 );
	}
	public function test(){

		print_r($this->smarty);
	}
}
