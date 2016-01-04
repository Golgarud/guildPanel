<?php
/**
 * BattlenetOAuth2
 *
 * @author Golga
 * @package GuildPanel
 * @subpackage Module
 */

require('OAuth2/Client.php');
require('OAuth2/GrantType/IGrantType.php');
require('OAuth2/GrantType/AuthorizationCode.php');

class BattlenetOAuth2 extends Module
{
	protected $moduleName = "BattlenetOAuth2"; //UNIQUE module name (or key)

	private $client;
	private $auth_url;
	private $client_id = 'e8eu7zcg99rmpveekk8kccp3b2b5zwjs';
	private $client_secret = 'vkPykH6XmKcfrbEjDwa49BWRemFR2wGz';
	private $state = 'test';
	private $scope = 'wow.profile'; // FETCH WOW DATA
	// private $redirect_uri = "https://dev.battle.net/";
	private $redirect_uri = BASE_URL;
	private $authorize_uri = 'https://eu.battle.net/oauth/authorize';
	private $token_uri = 'https://eu.battle.net/oauth/token';


	public function __construct()
	{
		$this->setIsActive( 1 );
		$this->client = new OAuth2\Client($this->client_id, $this->client_secret);
	}

	public function hookDebug()
	{
		return print_r($this, 1);
	}

	public function hookContent()
	{
		// return array(
		// 	'content' => '<p>Pony ipsum dolor sit amet braeburn Fluttershy pegasus Sweetie Drops hot air balloon, Sunset Shimmer Angel Rainbow Dash Mr. Cake hay. Shadowbolts loyalty Sweetie Drops, Dr. Caballeron Diamond Tiara Apple Bloom Lightning Dust Big McIntosh alicorn Twist cupcakes Rarity. Gryphon dragon Soarin Dr Hooves cutie mark. Breezies Shining Armor Nightmare Moon, magic Rarity unicorn horn moon laugher friends Aria Blaze Prince Blueblood.</p>',
		// 	'class' => 'module-2h module-4w', // html class
		// 	'option' => 1, // enable or disable user's options
		// 	'linkName' => "BattlenetOAuth2", // add data linkName (cool think for JS execution)
		// 	'otherOption' => null // add specific user's options (html)
		// );
	}

	public function hookHead()
	{
		// // if ( !isset($_GET['response_type']) )
		// // {
		// // 	$this->auth_url = $this->authorize_uri.'?client_id='.$this->client_id.'&scope='.$this->scope.'&state='.$this->state.'&redirect_uri='.$this->redirect_uri.'&response_type=code';
		// // 	header('Location: ' . $this->auth_url);

		// // 	die('Redirect');
		// // }
		// // else
		// // {
		// 	// ESLE GET TOKEN AND ACCESS DATA

		// 	$params = array('code' => $_GET['code'], 'redirect_uri' => $this->redirect_uri);
		// 	$response = $this->client->getAccessToken($this->token_uri, 'authorization_code', $params);
		// 	$info = $response['result'];
		// 	$this->client->setAccessToken($info['access_token']);
		// 	$response = $this->client->fetch('https://eu.api.battle.net/wow/user/characters');
			
		// 	var_dump($response);
		// // }
		// return print_r($response, 1);
	}

	// run in <header> (header.tpl)
	// public function hookHeader()
	// {
	// 	return "<!-- BattlenetOAuth2 header info (authentification button for exemple) -->";
	// }

	// // run after <footer> (footer.tpl)
	// public function hookFoot()
	// {
	// 	return "<!-- BattlenetOAuth2 foot info (JS link for exemple) -->";
	// }

	// // run in <footer> (footer.tpl)
	// public function hookFooter()
	// {
	// 	return "<!-- BattlenetOAuth2 footer info (authentification button for exemple) -->";
	// }
}