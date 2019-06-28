<?php

/**
 * Ensures that the module init file can't be accessed directly, only within the application.
 */
defined('BASEPATH') or exit('No direct script access allowed');

/*
Module Name: PerfexCRM Module Boilerplate
Description: Sample module description.
Version: 2.3.0
Requires at least: 2.3.*
*/

define('PERFEXCRM_MODULE_BOILERPLATE_MODULE_NAME', 'PERFEXCRM_MODULE_BOILERPLATE');

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


// Get data from POST request

$data = $this->input->post();
$client_id = $this->input->post('client_id');

// Get data from GET request

$data = $this->input->get();
$client_id = $this->input->get('client_id');


function example_database_function($data)
{
    $CI = &get_instance();
    $CI->db->where('id', $data['id']);
    $CI->db->update(db_prefix() . 'table_name', [
        'column' => $data['key'],
    ]);
}



