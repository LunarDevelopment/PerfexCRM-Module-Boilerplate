<?php
/**
 * Copyright (c) 2019.
 *
 */

/*
 * Tap into Code Igniter and it's dependencies
 */

$CI =& get_instance();

$CI->load->helper('module_name/helper_name');
$CI->load->library('module_name/library_name');

/*
 * Get data from POST request
 */
$data = $this->input->post();
$client_id = $this->input->post('client_id');

/*
 * Get data from GET request
 */
$data = $this->input->get();
$client_id = $this->input->get('client_id');


/*
 * Connect to the database with CI ORM
 */
function example_database_function($data)
{
    $CI = &get_instance();
    $CI->db->where('id', $data['id']);
    $CI->db->update(db_prefix() . 'table_name', [
        'column' => $data['key'],
    ]);
}


/*
 * Create a Table
 */

if (!$CI->db->table_exists(db_prefix() . 'new_table')) {
    $CI->db->query('CREATE TABLE `' . db_prefix() . "new_table` (
  `id` INT(11) NOT NULL,
  `subject` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `goal_type` INT(11) NOT NULL,
  `contract_type` INT(11) NOT NULL DEFAULT '0',
  `achievement` INT(11) NOT NULL,
  `notify_when_fail` TINYINT(1) NOT NULL DEFAULT '1',
  `notify_when_achieve` TINYINT(1) NOT NULL DEFAULT '1',
  `notified` INT(11) NOT NULL DEFAULT '0',
  `staff_id` INT(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=" . $CI->db->char_set . ';');
}


/*
 * Options
 */

/**
 * Add a module option, the name must be unique amongst all modules.
 * @param  string $name     The name of the option to be added, make sure it’s unique and prefixed with E.q. your module name.
 * @param  string $value    Value to store.
 * @param  string $autoload if you are using the option a lot in the views then autoload it.
 * @return mixed
 */
add_option($name, $value, $autoload);
get_option($option_name);
update_option($option_name, $new_value);


/*
 * Available Hooks
 */

/**
 * Register module activation hook
 * @param  string $module   module system name
 * @param  mixed  $function function for the hook
 * @return mixed
 */

register_activation_hook($module, $function);

/**
 * Register module deactivation hook
 * @param  string $module   module system name
 * @param  mixed  $function function for the hook
 * @return mixed
 */

register_deactivation_hook($module, $function);

/**
 * Register module uninstall hook
 * @param  string $module   module system name
 * @param  mixed  $function function for the hook
 * @return mixed
 */

register_uninstall_hook($module, $function);

/**
 * Register module cron task, the cron task is executed after the core cron tasks are finished
 * @param  mixed $function function/class parameter for the hook
 * @return null
 */

register_cron_task($function);

/**
 * Inject custom payment gateway into the payment gateways array
 * @param string $idpayment gateway id, should equal like the libraries/classname e.q. gateways/New_gateway
 * @param string $module    module name to load the gateway if not already loaded
 */

register_payment_gateway($id, $module);

/**
 * Register module language files to support custom_lang.php file
 * @param  string $module    module system name
 * @param  array  $languages array of language file names without the _lang.php
 * @return null
 */

register_language_files($module, $languages);

/**
 * Module URL
 * e.q. https://crm-installation.com/module_name/
 * @param  string $module  module system name
 * @param  string $segment additional string to append to the URL
 * @return string
 */

module_dir_url($module, $segment = '');

/**
 * Module directory absolute path
 * @param  string $module module system name
 * @param  string $concat append additional string to the path
 * @return string
 */

module_dir_path($module, $concat = '');

/**
 * Module libraries path
 * e.q. modules/module_name/libraries
 * @param  string $module module name
 * @param  string $concat append additional string to the path
 * @return string
 */

module_libs_path($module, $concat = '');





