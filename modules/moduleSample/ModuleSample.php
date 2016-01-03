<?php
/**
 * ModuleSample
 *
 * @author Golga
 * @package GuildPanel
 * @subpackage Module
 */
class ModuleSample extends Module
{
	protected $isActive = true;
	protected $moduleName = "ModuleSample"; //UNIQUE module name (or key)

	public function __construct()
	{
		// enable or disable module
		$this->setIsActive( 1 );
	}

	// run before <head>
	public function hookDebug()
	{
		return print_r($this, 1);
	}

	// run in module's tabs
	public function hookContent()
	{
		return array(
			'content' => '<p>Pony ipsum dolor sit amet braeburn Fluttershy pegasus Sweetie Drops hot air balloon, Sunset Shimmer Angel Rainbow Dash Mr. Cake hay. Shadowbolts loyalty Sweetie Drops, Dr. Caballeron Diamond Tiara Apple Bloom Lightning Dust Big McIntosh alicorn Twist cupcakes Rarity. Gryphon dragon Soarin Dr Hooves cutie mark. Breezies Shining Armor Nightmare Moon, magic Rarity unicorn horn moon laugher friends Aria Blaze Prince Blueblood.</p>',
			'class' => 'module-2h module-4w', // html class
			'option' => 1, // enable or disable user's options
			'linkName' => "ModuleSample", // add data linkName (cool think for JS execution)
			'otherOption' => null // add specific user's options (html)
		);
	}

	// run in left menu (toolbar.tpl)
	public function hookMenu()
	{
		return array(
			'icoClass' => 'fa fa-2x fa-fort-awesome', //icon html class
			'linkName' => "ModuleSample", // add data linkName (cool think for JS execution)
			'otherOption' => null // add specific user's options (html)
		);
	}

	// run in <head> (header.tpl)
	public function hookHead()
	{
		return "<!-- ModuleSample head info (CSS link for exemple) -->";
	}

	// run in <header> (header.tpl)
	public function hookHeader()
	{
		return "<!-- ModuleSample header info (authentification button for exemple) -->";
	}

	// run after <footer> (footer.tpl)
	public function hookFoot()
	{
		return "<!-- ModuleSample foot info (JS link for exemple) -->";
	}

	// run in <footer> (footer.tpl)
	public function hookFooter()
	{
		return "<!-- ModuleSample footer info (authentification button for exemple) -->";
	}
}