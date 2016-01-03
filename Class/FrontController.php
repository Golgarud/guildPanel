<?php
/**
 * ModulesController
 *
 * @package GuildPanel
 * @subpackage class
 */
class FrontController extends Controller
{
	private $templateList;
	private $hookData;
	
	/**
	 * __construct moduleController
	 * @author Golga
	 * @since 0.2
	 * @param array		$templateList
	 * @param array		$hookData
	 * @return boolean
	 */
	public function __construct( $smarty, $db, $templateList = null, $hookData = null )
	{
		parent::__construct( $smarty, $db );

		$this->templateList = $templateList;
		$this->hookData = $hookData;
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
		parent::__destruct();
		unset($this->templateList);
		unset($this->hookData);
		return true; 
	}

	/**
	 * catchGlobData
	 * @author Golga
	 * @since 0.2
	 * @param array		$templateList
	 * @param array		$hookData
	 * @return boolean
	 */
	public function catchGlobData( $debug = false )
	{
		$glob = array( 
			'get'		=> $_GET,
			'post'		=> $_POST,
			'url'		=> "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]",
			'prevUrl'	=> ( isset($_SERVER["HTTP_REFERER"]) ) ? $_SERVER["HTTP_REFERER"] : null ,
			'host'		=> ( isset($_SERVER["HTTP_HOST"]) ) ? $_SERVER["HTTP_HOST"] : null ,
			'request'	=> ( isset($_SERVER["REQUEST_URI"]) ) ? $_SERVER["REQUEST_URI"] : null ,
			'templateList'	=> $this->templateList
		);

		if ( $debug )
		{
			throw new Exception( "Display debuging informations: \n<br />" . print_r( $this->hookData ,1 ) . "\n<hr />" . print_r( $glob, 1 ) );
		}
		else
		{
			$this->smartyAssign( $glob );
			$this->smartyAssign( $this->hookData );
		}
	}

	/**
	 * displayTpl
	 * @author Golga
	 * @since 0.2
	 * @return boolean
	 */
	public function displayTpl()
	{
		foreach ( $this->templateList as $key => $value )
		{
			$this->smarty->display( $value . TEMPLATE_EXT );
		}
		return true;
	}

}
?>