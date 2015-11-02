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
	
	/**
	 * __construct
	 *
	 * @param smarty (obj), db (obj), uninstalledModule (array), moduleList (array)
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
	 * @param none
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
	 * @param none
	 * @return $moduleList (array)
	*/
	public function getModuleList( )
	{
		return $this->moduleList;
	}

	/**
	 * setModuleList
	 *
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