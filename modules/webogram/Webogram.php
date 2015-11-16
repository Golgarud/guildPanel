<?php
/**
 * Webogram
 *
 * @package GuildPanel
 * @subpackage Module
 */
class Webogram extends Module
{
	// protected $smarty;
	public function __construct()
	{
		$this->setIsActive( 1 );
	}


	public function hookDebug()
	{
		print_r($this);
		echo "<hr />";
		echo $this->smarty;
		// return $this->smarty->fetch('index.tpl', "116rd");
	}
}
