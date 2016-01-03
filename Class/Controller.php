<?php
/**
 * ModulesController
 *
 * @package GuildPanel
 * @subpackage class
 */
class Controller
{
	protected $smarty;
	protected $db;

	/**
	 * __construct moduleController
	 * @author Golga
	 * @since 0.2
	 * @param	object		$smarty
	 * @param	object		$db
	 */
	public function __construct( $smarty, $db )
	{
		$this->smarty = $smarty;
		$this->db = $db;
		return true; 
	}

	/**
	 * __destruct
	 *
	 * @author Golga
	 * @since 0.2
	 * @param none
	 * @return boolean
	*/
	public function __destruct()
	{
		unset($this->smarty);
		unset($this->db);
		return true; 
	}

	/**
	 * smartyAssign
	 * @author Golga
	 * @since 0.2
	 * @param	array	$data
	 */
	public function smartyAssign( $data )
	{
		foreach ($data as $key => $value)
		{
			$this->smarty->assign( $key, $value );
		}
		return true; 
	}
}