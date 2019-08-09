<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$imageDetails = $_FILES['imageDetails'];

$destinationDirectory = "../images/";

$msg = "error";

try {

    if (move_uploaded_file($imageDetails['tmp_name'], $destinationDirectory . $imageDetails['name'])) {

        $msg = "success";
    } else {
        $msg = "error";
    }
} catch (Exception $ex) {
    return $msg;
}

return $msg;
