<?php
/**
 * Module
 *
 * @package GuildPanel
 * @subpackage class
 */
class Module extends Controller
{
	private $isAdmin = false;
	private $isActive = false;
	private $needLogin = false;

	/**
	 * hookDebug debuging defalut method
	 * This is a cool function
	 * @author Golga
	 * @since 0.2
	 */
	public function hookDebug()
	{
		return print_r($this, 1);
	}

	/**
	 * __construct constructor of Module class
	 *
	 * @author Golga
	 * @since 0.1
	 * @return  boolean
	 */
	public function __construct(  )
	{
		return true; 
	}

	/**
	 * __destruct destructor of Module class
	 * 
	 * @author Golga
	 * @since 0.1
	 * @return boolean
	 */
	public function __destruct()
	{
		return true; 
	}

	/**
	 * getIsAdmin
	 * 
	 * @author Golga
	 * @since 0.1
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
	 * @since 0.1
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
	 * @since 0.1
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
	 * @since 0.1
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
	 * @since 0.1
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
	 * @since 0.1
	 * @return boolean
	 */
	public function setNeedLogin( $val )
	{
		$this->needLogin = $val;
		return true; 
	}
}
?>