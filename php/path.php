<?php	// UTF-8 marker äöüÄÖÜß€
/**
 * Class PageTemplate for the exercises of the EWA lecture
 * Demonstrates use of PHP including class and OO.
 * Implements Zend coding standards.
 * Generate documentation with Doxygen or phpdoc
 * 
 * PHP Version 5
 *
 * @category File
 * @package  Pizzaservice
 * @author   Bernhard Kreling, <b.kreling@fbi.h-da.de> 
 * @author   Ralf Hahn, <ralf.hahn@h-da.de> 
 * @license  http://www.h-da.de  none 
 * @Release  1.2 
 * @link     http://www.fbi.h-da.de 
 */

// to do: change name 'PageTemplate' throughout this file
//require_once './Page.php';
require_once 'Page.php';
/**
 * This is a template for top level classes, which represent 
 * a complete web page and which are called directly by the user.
 * Usually there will only be a single instance of such a class. 
 * The name of the template is supposed
 * to be replaced by the name of the specific HTML page e.g. baker.
 * The order of methods might correspond to the order of thinking 
 * during implementation.
 
 * @author   Bernhard Kreling, <b.kreling@fbi.h-da.de> 
 * @author   Ralf Hahn, <ralf.hahn@h-da.de> 
 */
class _Path extends Page
{
    // to do: declare reference variables for members 
    // representing substructures/blocks
    private $content_html;
 private $result_html;
    
    /**
     * Instantiates members (to be defined above).   
     * Calls the constructor of the parent i.e. page class.
     * So the database connection is established.
     *
     * @return none
     */
    protected function __construct() 
    {
        parent::__construct();
        // to do: instantiate members representing substructures/blocks
    }
    
    /**
     * Cleans up what ever is needed.   
     * Calls the destructor of the parent i.e. page class.
     * So the database connection is closed.
     *
     * @return none
     */
    protected function __destruct() 
    {
        parent::__destruct();
    }
	
    /**
     * Fetch all data that is necessary for later output.
     * Data is stored in an easily accessible way e.g. as associative array.
     *
     * @return none
     */
    protected function getViewData()
    {
		
		$query= "SELECT DISTINCT j.system_id_1 AS systemId1, s1.system_name AS systemName1, j.system_id_2 AS systemId2, s2.system_name AS systemName2  FROM wcrs_system s1, wcrs_jump j, wcrs_system s2 WHERE s1.system_id = j.system_id_1 AND  s2.system_id = j.system_id_2 ORDER BY s1.system_name";
	
		$jumpList = array();
		
		if ($Recordset = $this->_database->query($query)) {
		
			
			while ($row = $Recordset->fetch_assoc()) {
				 //$this->content_html .='<option value="'.$row['systemId1'].'">'.$row['systemName1'].'</option>';
				$jumpList[$row['systemId1']] = $row['systemName1'];
				$jumpList[$row['systemId2']] = $row['systemName2'];
			}	
	
		}
		
		asort($jumpList);
	
		$this->content_html .='<form action="' . htmlentities($_SERVER['PHP_SELF']) . '" method="post">';
		$this->content_html .='<div class="form-group">';
		$this->content_html .='<label for="exampleInputEmail1">Startsystem</label>';
		
		$this->content_html .='<select class="form-control" name="start" id="start">';
		foreach($jumpList as $j => $j_value) {
				 $this->content_html .='<option value="'.$j.'">'.$j_value.'</option>';
	
			}	
		$this->content_html .='</select>';
		
		$this->content_html .='</div>';
		$this->content_html .='<div class="form-group">';
		$this->content_html .=' <label for="exampleInputPassword1">Zielsystem</label>';
		
		$this->content_html .='<select class="form-control" name="ziel" id="ziel">';
	
		foreach($jumpList as $j => $j_value) {
				 $this->content_html .='<option value="'.$j.'">'.$j_value.'</option>';
				
			}	
						
			$this->content_html .='</select>';
			$this->content_html .='</div>';
			$this->content_html .='<button type="submit" name="submit" class="btn btn-default">Submit</button>';
			$this->content_html .='</form>';

			$Recordset->free();		
		
    }
    
    /**
     * First the necessary data is fetched and then the HTML is 
     * assembled for output. i.e. the header is generated, the content
     * of the page ("view") is inserted and -if avaialable- the content of 
     * all views contained is generated.
     * Finally the footer is added.
     *
     * @return none
     */
    protected function generateView() 
    {
        $this->getViewData();
        $this->generatePageHeader('System');
        // to do: call generateView() for all members
        // to do: output view of this page
		$this->getContent();
        $this->generatePageFooter();
    }
	
	protected function getContent() 
	{
		echo $this->content_html;
		echo $this->result_html;
    }
    
    /**
     * Processes the data that comes via GET or POST i.e. CGI.
     * If this page is supposed to do something with submitted
     * data do it here. 
     * If the page contains blocks, delegate processing of the 
	 * respective subsets of data to them.
     *
     * @return none 
     */
    protected function processReceivedData() 
    {
        parent::processReceivedData();
        // to do: call processReceivedData() for all members
		error_reporting(-1);
		
		
		if (isset($_POST['submit'])) {
		
        // to do: fetch data for this view from the 
		$queryList = array();
		
		$allowedList = array();
		

		
		$queryList[0][0] = "SELECT j.system_id_1 AS systemId1, s1.system_name AS systemName1, j.system_id_2 AS systemId2, s2.system_name AS systemName2  FROM wcrs_system s1, wcrs_jump j, wcrs_system s2 WHERE s1.system_id = j.system_id_1 AND  s2.system_id = j.system_id_2";
		
		
		//$queryList[0][0] = "SELECT FROM wcrs_jump, wcrs_system WHERE system_id_1 =  ORDER BY system_id_1";
		
		//$json = '';
		$_distArr = array();

		foreach ($queryList as $b) {		
		$this->content_html .= '<p>';
				if ($Recordset = $this->_database->query($b[0])) {			
					$rows = array();
					while ($row = $Recordset->fetch_assoc()) {
						//$rows[] = $row;
						
						
						{
							// Hole System-IDs
							$id1= intval(htmlentities($row['systemId1']));
							$id2= intval(htmlentities($row['systemId2']));
							
							// Erzeuge bidirektionalen Pfad
							$_distArr[$id1][$id2] = 1;
							$_distArr[$id2][$id1] = 1;
							
							// Erzeuge Liste zum Überprüfen auf vorhandene Pfade
							$allowedList[$id1] = htmlentities($row['systemName1']);
							$allowedList[$id2] =  htmlentities($row['systemName2']);
							//$allowedList[$id1] = 1;
							//$allowedList[$id2] =  1;

						}
						
						
					}
					
					/* free result set */
					$Recordset->free();
				}
				
				//$json .= '\\r\\n';
				$this->content_html .= '<p/>';
		}
				

//$a=1;
//  $b=134;
$a = intval($_POST['start']);
$b = intval($_POST['ziel']);

if ($a != $b)
{

//if (!array_key_exists($b, $Q)||!array_key_exists($a, $Q)) {
if (!array_key_exists($b, $allowedList)||!array_key_exists($a, $allowedList)) {
    echo "Found no way.";
    return;
}

//initialize the array for storing
$S = array();//the nearest path with its parent and weight
$Q = array();//the left nodes without the nearest path
foreach(array_keys($_distArr) as $val) $Q[$val] = 99999;
$Q[$a] = 0;

//start calculating


while(!empty($Q)){
    $min = array_search(min($Q), $Q);//the most min weight
    if($min == $b) break;
    foreach($_distArr[$min] as $key=>$val) if(!empty($Q[$key]) && $Q[$min] + $val < $Q[$key]) {
        $Q[$key] = $Q[$min] + $val;
        $S[$key] = array($min, $Q[$key]);
    }

    unset($Q[$min]);
}

//list the path
$path = array();
$pos = $b;
$route = true;
$steps =0;
while($pos != $a){
	$steps++;
	if ($steps>=999) {$route=false;break;}
    $path[] = $allowedList[$pos];
    $pos = $S[$pos][0];
}
if ($route==true)
{$path[] = $allowedList[$a];
//echo $allowedList[$a];
$path = array_reverse($path);

//print result
$size =$S[$b][1];
$this->result_html .=	 "<p>Die kürzeste Route von <b>$path[0]</b> nach <b>$path[$size]</b> benötigt <b>$size Jumps</b>:</p>";
$this->result_html .=	 "<p>".implode(' &rArr; ', $path)."</p>";	
}
else{
	$this->result_html .="<p>Keine Route gefunden.</p>";
}		
}
else{$this->result_html .="<p>Kein Sprung notwendig, um das Ziel zu erreichen.</p>";}			
			
    }
	}

    /**
     * This main-function has the only purpose to create an instance 
     * of the class and to get all the things going.
     * I.e. the operations of the class are called to produce
     * the output of the HTML-file.
     * The name "main" is no keyword for php. It is just used to
     * indicate that function as the central starting point.
     * To make it simpler this is a static function. That is you can simply
     * call it without first creating an instance of the class.
     *
     * @return none 
     */    
    public static function main() 
    {
        try {
            $page = new _Path();
            $page->processReceivedData();
            $page->generateView();
        }
        catch (Exception $e) {
            header("Content-type: text/plain; charset=UTF-8");
            echo $e->getMessage();
        }
    }
}

// This call is starting the creation of the page. 
// That is input is processed and output is created.
_Path::main();

// Zend standard does not like closing php-tag!
// PHP doesn't require the closing tag (it is assumed when the file ends). 
// Not specifying the closing ? >  helps to prevent accidents 
// like additional whitespace which will cause session 
// initialization to fail ("headers already sent"). 
//? >







