<?php
/**
 * ModulesController
 *
 * @package GuildPanel
 * @subpackage class
 */
class ModulesController
{
	private $smarty;
	private $db;
	private $moduleList;
	private $uninstalledModule;
	private $instanciedModule;
	private $hookList = array( "hookDebug", "hookHead", "hookHeader", "hookContent", "hookMenu", "hookFoot", "hookFooter" );
	
	/**
	 * __construct moduleController
	 * @author Golga
	 * @version 0.1
	 * @param	object		$smarty
	 * @param	object		$db
	 * @param	array		$moduleList
	 * @param	array		$uninstalledModule
	 * @return boolean
	 */
	public function __construct( $smarty, $db, $moduleList = null, $uninstalledModule = null )
	{
		if ($moduleList == null )
		{
			$files = scandir( MOD_DIR );
			foreach ($files as $key => $module) 
			{
				if (
						isset($module)
					&&	$module !="."
					&&	$module !=".."
					&&	$module !="index.html"
					&&	$module !="index.php"
					&&	!is_file($module)
					)
				{
					$moduleList[] = $module;
				}
			}
		}
		$this->moduleList = $moduleList;
		$this->uninstalledModule = $uninstalledModule;
		return true; 
	}

	/**
	 * instanceModuleList
	 *
	 * @author Golga
	 * @version 0.1
	 * @return boolean
	*/
	public function instanceModuleList( )
	{
		include CLASS_DIR."/module.php";
		$moduleList = $this->moduleList;
		$instanciedModule = array();
		foreach ($moduleList as $k => $modd)
		{
			$moddClassName = ucfirst( $modd );
			$moddPath = "./modules/" . $modd . "/" . $moddClassName . ".php";
			if( file_exists ( $moddPath ) )
			{
				include "./modules/" . $modd . "/" . $moddClassName . ".php";
				if ( !$instanciedModule[$moddClassName] = new $moddClassName( $this->smarty, $this->db ) )
				{
					die("Error: le module " . $moddClassName . " n'a pas pue etres instancier.");
				}
			}
			else
			{
				die("Error: le module " . $moddClassName . " n'a pas pue etres instancier.");
			} 
		}
		$this->instanciedModule = $instanciedModule;
		return true;
	}

	/**
	 * getModuleList
	 *
	 * @author Golga
	 * @version 0.1
	 * @return $moduleList (array)
	*/
	public function getModuleList( )
	{
		return $this->moduleList;
	}

	/**
	 * runHook
	 *
	 * @author  Golga
	 * @param   string		$hookName
	 * @version 0.1
	 * @return  boolean
	*/
	public function runHook( $hookName )
	{
		$moduleList = $this->instanciedModule;
		$hookList = $this->hookList;
		if ( in_array( $hookName, $hookList ) && !empty($moduleList) )
		{
			foreach ($moduleList as $key => $module)
			{
				if (
						method_exists ( $module, $hookName )
					&&	!$module->getIsAdmin()
					&&	$module->getIsActive()
					&&	!$module->getNeedLogin()
					)
				{
					$module->$hookName();
					$module->test();
				}
				else{
					echo "nope";
				}
			}
			return true;
		}
		return false;
	}

	/**
	 * setModuleList
	 *
	 * @author Golga
	 * @version 0.1
	 * @param moduleList (array)
	 * @return boolean
	*/
	public function setModuleList( $moduleList )
	{
		$his->moduleList = $moduleList;
		return true;
	}

	/**
	 * __destruct
	 *
	 * @author Golga
	 * @version 0.1
	 * @param none
	 * @return boolean
	*/
	public function __destruct()
	{
		unset($this->moduleList);
		unset($this->uninstalledModule);
		return true; 
	}
}
?>