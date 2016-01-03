-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 02 Décembre 2015 à 19:28
-- Version du serveur :  5.6.26
-- Version de PHP :  5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `guildpanel`
--

-- --------------------------------------------------------

--
-- Structure de la table `gp_mod_news`
--

CREATE TABLE IF NOT EXISTS `gp_mod_news` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `title` text COLLATE utf8_unicode_ci NOT NULL,
  `content` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `statut` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `gp_users`
--

CREATE TABLE IF NOT EXISTS `gp_users` (
  `id` int(11) NOT NULL,
  `pseudo` text COLLATE utf8_unicode_ci NOT NULL,
  `tel` int(11) DEFAULT NULL,
  `email` text COLLATE utf8_unicode_ci NOT NULL,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `token` text COLLATE utf8_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `rank` int(11) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `gp_mod_news`
--
ALTER TABLE `gp_mod_news`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `gp_users`
--
ALTER TABLE `gp_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `gp_mod_news`
--
ALTER TABLE `gp_mod_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `gp_users`
--
ALTER TABLE `gp_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
