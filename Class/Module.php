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
	 * Init Controller object
	 * @param object		$smarty
	 * @param object		$db
	 * @return boolean
	 * @author Golga
	 * @since 0.3
	 */
	public function init($smarty, $db)
	{
		parent::__construct( $smarty, $db );
		return true;
	}

	/**
	 * getIsAdmin
	 * 
	 * @author Golga
	 * @since 0.3
	 * @return boolean
	 */
	public function getIsAdmin()
	{
		return ( isset($this->isAdmin) ) ? $this->isAdmin : null ;
	}

	/**
	 * getIsActive
	 * 
	 * @author Golga
	 * @since 0.3
	 * @return boolean
	 */
	public function getIsActive()
	{ 
		return ( isset($this->isActive) ) ? $this->isActive : null ;
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
		return ( isset($this->needLogin) ) ? $this->needLogin : null ;
	}

	/**
	 * getModuleName
	 *
	 * @author Golga
	 * @since 0.3
	 * @param none
	 * @return string
	*/
	public function getModuleName()
	{
		return ( isset($this->moduleName) ) ? $this->moduleName : null ;
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