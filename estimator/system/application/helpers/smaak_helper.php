<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SmaaK
 *
 * @author Sandae
 */
if (!function_exists('x_resource')) {
    function x_resource($path) {	
		return base_url() . $path;
		// $server = getenv('SERVER_NAME');
		// $port   = getenv('SERVER_PORT');
        // return "http://$server:$port/$path";
    }
}

if (!function_exists('chk')) {
    function chk($name, $label, $value = NULL, $is_checked = FALSE, $class = NULL) {
        return sprintf(
                '<input type="checkbox" name="%s" value="%s" %s id="%s" class="%s"> %s',
                $name,
                $value,
                $is_checked ? 'checked="checked"' : "",
                $name,
                $class,
                $label
        );
    }
}

if (!function_exists('lnk')) {
    function lnk($display, $ref) {
        return sprintf(
                '<a href="%s">%s</a>',
                $ref,
                $display
        );
    }
}

if (!function_exists('area')) {
    function area($name, $value = NULL, $cols = 80, $rows = 20, $class = NULL) {
        return sprintf(
                '<textarea name="%s" cols="%s" rows="%s" class="%s">%s</textarea>',
                $name,
                $cols,
                $rows,
                $class,
                $value
        );
    }
}

if (!function_exists('hidden')) {
    function hidden($name, $value) {        
        return form_hidden($name, strlen($value) > 0 ? $value : param($name));
    }
}

if (!function_exists('txt')) {
    function txt($name, $value = NULL, $class = NULL) {
        return sprintf(
                '<input type="text" name="%s" value="%s" class="%s" id="%s" />',
                $name,
                $value ? $value : param($name),
                $class,
                $name
        );
    }
}

if (!function_exists('pass')) {
    function pass($name, $class = NULL) {
        return sprintf(
                '<input type="password" name="%s" class="%s" id="%s" />',
                $name, 
                $class ? $class : $name,
                $name
        );
    }
}

if (!function_exists('btn')) {
    function btn($name, $value, $class = NULL) {
        return sprintf(
                '<input type="button" name="%s" content="%s" value="%s" id="%s" class="%s" />',
                $name, 
                $value,
                $value,
                $name,
                $class
        );
    }
}

if (!function_exists('hidden')) {
    function hidden($name, $value) {
        return form_hidden($name, strlen($value) > 0 ? $value : param($name));
    }
}

if (!function_exists('dropdown')) {
    function dropdown($name, $key_values, $default = null) {
        return form_dropdown($name, $key_values, $default ? $default : param($name));             
    }

}

if (!function_exists('select')) {
    function select($name, $model_collection, $key, $val, $default = NULL) {
        return form_dropdown(
                $name,
                toArray($model_collection, $key, $val),
                $default);
    }
}

if (!function_exists('cmd')) {
    function cmd($name, $value, $class = NULL) {
        return sprintf(
                '<input type="submit" name="%s" value="%s" id="%s" class="%s" />',
                $name,
                $value,
                $name,
                $class ? $class : $name
         );
    }
}

if (!function_exists('toArray')) {
    function toArray($collection, $key, $value) {
        $data = array();        
        foreach ($collection as $k => $obj) {                        
            $k = method_exists($obj, $key) ? $obj->$key() : $obj->$key;
            $v = method_exists($obj, $value) ? $obj->$value() : $obj->$value;
            
            $data[$k] = $v;
        }

        return $data;
    }
}

if (!function_exists('param')) {
    function param($key) {
        if (isset($_POST[$key])) {
            return $_POST[$key];
        }
        else {
            if (isset($_GET[$key])) {
                return $_GET[$key];
            }
            else if (isset($_SESSION[$key])) {
                return $_SESSION[$key];
            }
        }

        return FALSE;
    }
}
?>