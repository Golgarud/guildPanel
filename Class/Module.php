<?php
/**
 * Module
 *
 * @package GuildPanel
 * @subpackage class
 */
class Module
{
	public $smarty;
	private $db;
	private $isAdmin = false;
	private $isActive = false;
	private $needLogin = false;

	/**
	 * hookDebug debuging defalut method
	 * This is a cool function
	 * @author Golga
	 * @version 0.1
	 */
	public function hookDebug()
	{
		print_r($this);
	}

	/**
	 * parentInit constructor of Module class
	 *
	 * @author Golga
	 * @version 0.1
	 * @param   obj        $smarty global smarty object
	 * @param   obj        $db     global sql object
	 * @return  boolean
	 */
	public function parentInit( $smarty, $db )
	{
		echo "string";
		echo $smarty;
		$thit->smarty = $smarty;
		$thit->db = $db;
		return true; 
	}

	/**
	 * __destruct destructor of Module class
	 * 
	 * @author Golga
	 * @version 0.1
	 * @return boolean
	 */
	protected function __destruct()
	{
		unset($this->db);
		unset($this->smarty);
		return true; 
	}

	/**
	 * getIsAdmin
	 * 
	 * @author Golga
	 * @version 0.1
	 * @return boolean
	 */
	public function getIsAdmin()
	{
		return $this->isAdmin; 
	}

	/**
	 * getIsActive
	 * 
	 * @author Golga
	 * @version 0.1
	 * @return boolean
	 */
	public function getIsActive()
	{
		return $this->isActive; 
	}

	/**
	 * getNeedLogin
	 * 
	 * @author Golga
	 * @version 0.1
	 * @return boolean
	 */
	public function getNeedLogin()
	{
		return $this->needLogin; 
	}

	/**
	 * setIsAdmin
	 * 
	 * @author Golga
	 * @version 0.1
	 * @return boolean
	 */
	public function setIsAdmin( $val )
	{
		$this->isAdmin = $val;
		return true; 
	}

	/**
	 * setIsActive
	 * 
	 * @author Golga
	 * @version 0.1
	 * @return boolean
	 */
	public function setIsActive( $val )
	{
		$this->isActive = $val;
		return true; 
	}

	/**
	 * setNeedLogin
	 * 
	 * @author Golga
	 * @version 0.1
	 * @return boolean
	 */
	public function setNeedLogin( $val )
	{
		$this->needLogin = $val;
		return true; 
	}
}
?>