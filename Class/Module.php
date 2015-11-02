<?php
/**
 * Module
 *
 * @package GuildPanel
 * @subpackage class
 */
class Module
{
	private $smarty;
	private $db;
	/**
	 * __construct
	 *
	 * @param smarty (obj), db (obj)
	 * @return boolean
	*/
	public function __construct( $smarty, $db )
	{
		$thit->smarty = $smarty;
		$thit->db = $db;
		return true; 
	}

	/**
	 * __destruct
	 *
	 * @param none
	 * @return boolean
	*/
	public function __destruct()
	{
		unset($this->db);
		unset($this->smarty);
		return true; 
	}
}
?>