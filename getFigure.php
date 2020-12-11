<?php

$handle = fopen("figure.csv", 'r');

$listTasks = array();

while (true) {
    $task = fgetcsv($handle);
    if ($task == false) {
        break;
    }
    $listTasks[] = $task;
}

// json_encode encode les données au format json.
// Pour les décoder on utilise json_decode.
// Afin de transmettre les données au js, on doit afficher ces données sur la page avec echo
echo json_encode($listTasks);

