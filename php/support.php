<?php
	
	function updateNotification ($var, $desc, $error)
	{
		if ($error==1)
		{
			echo '<div class="alert alert-danger" role="alert">'.htmlentities($desc). ": " . htmlentities($var).'</div>';
			}
		elseif($error==0){
			echo '<div class="alert alert-success" role="alert">'.htmlentities($desc). ": " . htmlentities($var).'</div>';
		}
	}
	
	function createEditButton($buttonName){
		$retVal = '<button class="btn btn-default" type="submit" name="'.htmlentities($buttonName).'" value="Edit"><span class="glyphicon glyphicon-edit"></span> Edit</button>';
		return $retVal;   
	}

	function createDeleteButton($buttonName){
		$retVal = '<button class="btn btn-default" type="submit" name="'.htmlentities($buttonName).'" value="Delete"><span class="glyphicon glyphicon-trash"></span> Delete</button>';
		return $retVal;
	}

	/*
	function createRow($a,$row)
	{
		$retVal = '';
		$index = 0;

		foreach ($a as $b) {
			
			if($index==0)
			{
				$retVal .=  ('<th scope="row">' . htmlentities($row[$b[2]]) . "</th>");
			}
			else{
				 //$retVal .=  ('<td>'. htmlentities(stripslashes($row[$b[2]])) .'</td>');
				 
				 $retVal .= '<td><div class="form-group"><label class="sr-only" for="'.htmlentities($b[0]).'">'.htmlentities($b[1]).'</label>
				 <input type="text" name="'.htmlentities($b[0]).'" class="form-control" id="'.htmlentities($b[0]).'" placeholder="'.htmlentities(stripslashes($row[$b[2]])).'" required>
					</div></td>';
				 
				 
			}
		
		$index++;
		}
		return $retVal;
	}
	
	
	
	
	
	function createTable($result,$a,$title,$buttonName,$buttonName2,$buttonName3){
		 $retVal = '';
		 $retVal .= ('<h1>'.htmlentities($title).'</h1>');
		 $retVal .= ('<div class="table-responsive"><table class="table table-bordered" ><thead><tr>');
		
		foreach ($a as $b) {
			 $retVal .= ('<th>'.htmlentities($b[1]).'</th>');
		}
		
		 $retVal .= ('<th>Actions</th></tr></thead><tbody>');
		
		
		$retVal .= createAdd($a, $buttonName);
		while ($row = $result->fetch_assoc()) {
			 $retVal .= ('<tr><form name="xxx" action="' . htmlentities($_SERVER['PHP_SELF']) . '" method="post">');
			
			// Erzeuge alle Reihen der Tabellen
			$retVal .= createRow($a,$row);
			 $retVal .= '<td>';
			 $retVal .= '<input type="hidden" name="'.htmlentities($a[0][0]).'" value="'. htmlentities($row[$a[0][2]]).'"/>';
			 $retVal .= '<div class="btn-group btn-group-flex" role="group" aria-label="">';
			
			$retVal .=createEditButton($buttonName2);  
			//createDeleteButton($buttonName3,$a[0][0], $row[$a[0][2]]);
			 $retVal .= ("</div></td></form></tr>");
		}
		
		 $retVal .= ("</tbody></table></div>");
		 
		 return $retVal;
	}
	

function createAdd($a,$buttonName)
{
	$retVal='';
	$index = 0;

	$retVal .=  ('<tr><form class="form-inline" action="' . htmlentities($_SERVER['PHP_SELF']) . '" method="post">');
	foreach ($a as $b) {
	
	if($index==0)
	{
		$retVal .=  '<td>
		 <div class="form-group">
			  <label class="sr-only" for="'.htmlentities($b[0]).'">Disabled input</label>
			  <input type="text" name="'.htmlentities($b[0]).'" id="'.htmlentities($b[0]).'" class="form-control" placeholder="Neu" disabled>
			</div>
		</td>';
	}
	else{
		$retVal .=  '<td>
		  <div class="form-group">
			<label class="sr-only" for="'.htmlentities($b[0]).'">'.htmlentities($b[1]).'</label>
			<input type="text" name="'.htmlentities($b[0]).'" class="form-control" id="'.htmlentities($b[0]).'" placeholder="'.htmlentities($b[1]).'" required>
		  </div>
		</td>';
	}
	$index++;
	}

	$retVal .=  '<td><button type="submit" name="'.htmlentities($buttonName).'" value="Add" class="btn btn-default"><span class="glyphicon glyphicon-plus"></span> Add</button></form></tr>';
	return $retVal;
}*/

function createRow($a,$row)
	{
		$retVal = '';
		$index = 0;
		$identifier = $row['systemId'];
		//$identifier = $row($a[0][2]);

		foreach ($a as $b) {
			
			if($index==0)
			{
				//$retVal .=  ('<td>'. htmlentities(stripslashes($row[$b[2]])) .'</td>');
				$retVal .=  '<div class=" col-sm-'.$b[3].'">';
					$retVal .= '<div class="form-group">';
						$retVal .= '<label class="sr-only" for="'.htmlentities($b[0]).'-'.$identifier.'">Disabled input</label>';
						$retVal .=  '<input type="text" name="'.htmlentities($b[0]).'" id="'.htmlentities($b[0]).'-'.$identifier.'" class="form-control" placeholder="'.htmlentities($row[$b[2]]).'" disabled>';
					$retVal .= '</div>';
				$retVal .= "</div>";		
			}
			else{
				 //$retVal .=  ('<td>'. htmlentities(stripslashes($row[$b[2]])) .'</td>');
				 //$retVal .= '<div class=" col-sm-'.$b[3].'"><div class="form-group"><label class="sr-only" for="'.htmlentities($b[0]).'-'.$identifier.'">'.htmlentities($b[1]).'</label><input type="text" name="'.htmlentities($b[0]).'" class="form-control" id="'.htmlentities($b[0]).'-'.$identifier.'" placeholder="'.htmlentities(stripslashes($row[$b[2]])).'" value="'.htmlentities(stripslashes($row[$b[2]])).'" required></div></div>';
				 $retVal .= '<div class=" col-sm-'.$b[3].'"><div class="form-group"><label class="sr-only" for="'.htmlentities($b[0]).'-'.$identifier.'">'.htmlentities($b[1]).'</label><input type="text" name="'.htmlentities($b[0]).'" class="form-control" id="'.htmlentities($b[0]).'-'.$identifier.'" placeholder="'.htmlentities($row[$b[2]]).'" value="'.htmlentities($row[$b[2]]).'" required></div></div>';
				 
			}
		
		$index++;
		}
		return $retVal;
	}

	function createTable($result,$a,$title,$buttonName,$buttonName2,$buttonName3){
		 $retVal = '';
		 
		// $retVal .='<nav class="navbar navbar-inverse" data-spy="affix" data-offset-top="197">aaaa';
		//$retVal .='</nav>';

		 $headerHTML='';
		 $retVal .= ('<h1>'.htmlentities($title).'</h1>');
		
		// Tabelle starten
		 $retVal .= '<div class="container-fluid">';
		 $headerHTML .= '<div class="row">';
			
		// Headerspalten erzeugen
		foreach ($a as $b) {
			$headerHTML .= '<div class=" text-center col-sm-'.$b[3].'"><strong>'.htmlentities($b[1]).'</strong></div>';
		}
		
		 //Schließe Kopfreihe ab
		$headerHTML .= ('<div class=" text-center col-sm-1"><strong>Aktionen</strong></div></div>');
		
		$retVal .= $headerHTML;
		
		// fetch associative array 
		$retVal .= createAdd($a, $buttonName);
		$retVal .= '<hr>';
		
		$retVal .= $headerHTML;
		
		while ($row = $result->fetch_assoc()) {
			 $retVal .= ('<div class="row"><form name="form-'.$row[$a[0][2]].'" action="' . htmlentities($_SERVER['PHP_SELF']) . '" method="post">');
			
			// Erzeuge alle Reihen der Tabellen
			$retVal .= createRow($a,$row);
			$retVal .= '<div class=" text-center col-sm-1">';
			$retVal .= '<input type="hidden" name="'.htmlentities($a[0][0]).'" value="'. htmlentities($row[$a[0][2]]).'"/>';
			$retVal .= '<div class="btn-group btn-group-flex" role="group" aria-label="">';
			
			$retVal .= createEditButton($buttonName2);  
			//$retVal .= createDeleteButton($buttonName3);
			$retVal .= ("</div></div></form></div>");
		}
		
		 $retVal .= '</div>';
		return $retVal;
	}


function createAdd($a,$buttonName)
{
	$retVal='';
	$firstColumn = false;
	
	//$retVal .= '<div class="panel panel-default"><div class="panel-body">';
	$retVal .=  '<div class="row"><form class="form" action="' . htmlentities($_SERVER['PHP_SELF']) . '" method="post">';
	foreach ($a as $b) {
	
	if($firstColumn==false)
	{
		$retVal .=  '<div class=" col-sm-'.$b[3].'">
		 <div class="form-group">
			  <label class="sr-only" for="'.htmlentities($b[0]).'">Disabled input</label>
			  <input type="text" name="'.htmlentities($b[0]).'" id="'.htmlentities($b[0]).'" class="form-control" placeholder="Neu" disabled>
			</div>
		</div>';
		$firstColumn = true;
	}
	else{
		$retVal .=  '<div class=" col-sm-'.$b[3].'">
		  <div class="form-group">
			<label class="sr-only" for="'.htmlentities($b[0]).'">'.htmlentities($b[1]).'</label>
			<input type="text" name="'.htmlentities($b[0]).'" class="form-control" id="'.htmlentities($b[0]).'" placeholder="'.htmlentities($b[1]).'" required>
		  </div>
		</div>';
	}
	
	}

	$retVal .=  '<div class=" col-sm-1"><button type="submit" name="'.htmlentities($buttonName).'" value="Add" class="btn btn-default"><span class="glyphicon glyphicon-plus"></span> Add</button></div></form></div>';

	//$retVal .=  '</div></div>';
	return $retVal;
}


function editTemplate($array, $mysqli, $n){
	//echo 'Entered';
	$stmt;// = $mysqli->prepare("UPDATE wcrs_jump SET system_id_1=?,system_id_2=?,jump_status=? WHERE jump_id=?");
	//$stmt->bind_param("iiii",$array[1], $array[2],$array[3],$array[0]);

	switch ($n) {
    case 'System':
        $stmt = $mysqli->prepare("UPDATE wcrs_system SET system_name=?, system_x=?, system_y=?, system_z=?, faction_id=?, quadrant_id=?, system_status=? WHERE system_id=?");
		$stmt->bind_param("siiiiiii",$array[0], $array[1],$array[2],$array[3],$array[4],$array[5],$array[6],$array[7]);
        break;
    case 'Quadrant':
        $stmt = $mysqli->prepare("UPDATE wcrs_quadrant SET quadrant_name=?, quadrant_x=?, quadrant_y=?, sector_id=? WHERE quadrant_id=?");
		$stmt->bind_param("siiii",$array[0], $array[1],$array[2],$array[3],$array[4]);
        break;
    case 'Sektor':
        $stmt = $mysqli->prepare("UPDATE wcrs_sector SET sector_name=? WHERE sector_id=?");
		$stmt->bind_param("si", $array[0],$array[1]);
        break;
	case 'Jump':
        $stmt = $mysqli->prepare("UPDATE wcrs_jump SET system_id_1=?,system_id_2=?,jump_status=? WHERE jump_id=?");
		$stmt->bind_param("iiii",$array[0], $array[1], $array[2],$array[3]);
        break;
	case 'Faktion':
        $stmt = $mysqli->prepare("UPDATE wcrs_faction SET faction_name=?, color_code=? WHERE faction_id=?");
		$stmt->bind_param("ssi",$array[0], $array[1], $array[2]);
        break;
	case 'Flotte':
        $stmt = $mysqli->prepare("UPDATE wcrs_fleet SET fleet_name=?, faction_id=?, fleet_image=?, system_id=?, fleet_status=? WHERE fleet_id=?");
		$stmt->bind_param("sisiii",$array[0], $array[1], $array[2],$array[3],$array[4],$array[5]);
        break;

    default:
        echo 'Nix';
	}

	if (!$stmt->execute()) {
		updateNotification($array[0], "Execute failed: (" . $stmt->errno . ") " . $stmt->error,1);
	}
	else{
		updateNotification($array[0], $n.' aktualisiert',0);
	}
	$stmt->close();

}


function insertSystem($array, $mysqli){
	
	$stmt = $mysqli->prepare("INSERT INTO wcrs_system (system_name, system_x, system_y, system_z, faction_id, quadrant_id, system_status) VALUES (?, ?, ?, ?, ?, ?, ?)");
	$stmt->bind_param("siiiiii",$array[0], $array[1],$array[2],$array[3],$array[4],$array[5],$array[6]);
	
	if (!$stmt->execute()) {
		updateNotification($array[0], "Execute failed: (" . $stmt->errno . ") " . $stmt->error,1);
	}
	else{
		updateNotification($array[0], 'System hinzugefügt',0);
	}

	$stmt->close();
}

function insertQuadrant($array, $mysqli){
	$stmt = $mysqli->prepare("INSERT INTO wcrs_quadrant (quadrant_name, quadrant_x, quadrant_y, sector_id) VALUES (?,?,?,?)");
	$stmt->bind_param("siii",$array[0], $array[1],$array[2],$array[3]);
	
	if (!$stmt->execute()) {
		updateNotification($array[0], "Execute failed: (" . $stmt->errno . ") " . $stmt->error,1);
	}
	else{
		updateNotification($array[0], 'Quadrant hinzugefügt',0);
	}

	$stmt->close();
}

function insertJump($array, $mysqli){
	
	$stmt = $mysqli->prepare("INSERT INTO wcrs_jump (system_id_1, system_id_2, jump_status) VALUES (?,?,?)");
	$stmt->bind_param("iii",$array[0], $array[1],$array[2]);
	
	if (!$stmt->execute()) {
		updateNotification($array[0], "Execute failed: (" . $stmt->errno . ") " . $stmt->error,1);
	}
	else{
		updateNotification($array[0], 'Jump hinzugefügt',0);
	}

	$stmt->close();
}

function insertSector($array, $mysqli){
	
	$stmt = $mysqli->prepare("INSERT INTO wcrs_sector (sector_name) VALUES (?)");
	$stmt->bind_param("s",$array[0]);
	
	if (!$stmt->execute()) {
		updateNotification($array[0], "Execute failed: (" . $stmt->errno . ") " . $stmt->error,1);
	}
	else{
		updateNotification($array[0], 'Sektor hinzugefügt',0);
	}

	$stmt->close();
}

function insertFaction($array, $mysqli){

	$stmt = $mysqli->prepare("INSERT INTO wcrs_faction (faction_name, color_code) VALUES (?,?)");
	$stmt->bind_param("ss",$array[0],$array[1]);
	
	if (!$stmt->execute()) {
		updateNotification($array[0], "Execute failed: (" . $stmt->errno . ") " . $stmt->error,1);
	}
	else{
		updateNotification($array[0], 'Faktion hinzugefügt',0);
	}

	$stmt->close();
}

function insertFleet($array, $mysqli){


	$stmt = $mysqli->prepare("INSERT INTO wcrs_fleet (fleet_name, faction_id, fleet_image, system_id, fleet_status) VALUES (?,?,?,?,?)");
	$stmt->bind_param("sisii",$array[0],$array[1],$array[2],$array[3],$array[4]);
	
	if (!$stmt->execute()) {
		updateNotification($array[0], "Execute failed: (" . $stmt->errno . ") " . $stmt->error,1);
	}
	else{
		updateNotification($array[0], 'Flotte hinzugefügt',0);
	}

	$stmt->close();
}