<?php
// conff

function rp( $path )
{
	$out = array();
	foreach(explode('/', $path) as $i=>$fold)
	{
		if ( $fold == '' || $fold == '.')
		{
			continue;
		}
		elseif ($fold == '..' && $i > 0 && end($out) != '..') 
		{
			array_pop($out);
		}
   		else
   		{
   			$out[]= $fold;
   		}
	}
	return ($path{0}=='/'?'/':'').join('/', $out);
}


define("CONFF_DIR", rp("./conff") );

// class
define("CLASS_DIR", rp("./Class") );
define("SMARTY_DIR", CLASS_DIR."/Smarty");
define("SMARTY_SYSPLUGINS_DIR", SMARTY_DIR."/sysplugins/");//END slashess used in smarty class
define("SMARTY_PLUGIN", SMARTY_DIR."/plugins/");//END slashess used in smarty class

// cache
define("CACHE_DIR", rp("./cache") );
define("CACHE_SMARTY_DIR", CACHE_DIR."/.smarty-cache");
define("CACHE_SMARTY_COMPILE", CACHE_DIR."/.smarty-compile");

// Templates
define("TEMPLATE_DIR", rp("./templates/golga2015") );
define("IMG_DIR", TEMPLATE_DIR."/img");
define("JS_DIR", TEMPLATE_DIR."/js");
define("CSS_DIR", TEMPLATE_DIR."/css");
define("adm_DIR", TEMPLATE_DIR."/adm");
?>