<?php	// UTF-8 marker äöüÄÖÜß€
/**

// to do: change name 'PageTemplate' throughout this file
require_once 'Page.php';

class _Jump extends Page
{
    // to do: declare reference variables for members 
    // representing substructures/blocks
    private $content_html;

    
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
		error_reporting(-1);
		
        // to do: fetch data for this view from the 
		$queryList = array();
		
		$queryList[0][0] = "SELECT system_id AS systemId, system_name as systemName, system_x as systemX, system_y as systemY, system_z AS systemZ, faction_id AS factionId, q.quadrant_id as quadrantId, quadrant_name AS quadrantName, quadrant_x as quadrantX, quadrant_y AS quadrantY, r.sector_id AS sectorId, r.sector_name AS sectorName, system_status AS systemStatus FROM wcrs_system s, wcrs_quadrant q, wcrs_sector r WHERE s.quadrant_id=q.quadrant_id AND q.sector_id = r.sector_id AND system_status >0 ORDER BY r.sector_id ASC, s.quadrant_id ASC, s.system_id ASC;";
		$queryList[0][1] = "system";
		
		$queryList[1][0] = "SELECT fleet_id AS fleetId, fleet_name AS fleetName, fleet_image as fleetImage, system_x AS systemX, system_y AS systemY, quadrant_x AS quadrantX, quadrant_y AS quadrantY, color_code AS colorCode FROM wcrs_system s, wcrs_quadrant q, wcrs_fleet f, wcrs_faction n WHERE n.faction_id = f.faction_id AND s.quadrant_id=q.quadrant_id AND s.system_id = f.system_id AND fleet_status >0 ORDER BY fleet_id ASC;";
		$queryList[1][1] = "fleet";
		
		$queryList[2][0] ="SELECT faction_id AS factionId, faction_name AS factionName, color_code AS colorCode FROM wcrs_faction ORDER BY faction_id ASC";
		$queryList[2][1] = "faction";
		
		$queryList[3][0] ="SELECT q.quadrant_x AS quadrantX, q.quadrant_y AS quadrantY, q.quadrant_name AS quadrantName, r.sector_id AS sectorId, r.sector_name AS sectorName FROM wcrs_quadrant q, wcrs_sector r WHERE q.sector_id=r.sector_id ORDER BY r.sector_id ASC, quadrant_id ASC";
		$queryList[3][1] = "quadrant";
		
		$queryList[4][0] = "SELECT (((q1.quadrant_x - 1)*30)+s1.system_x)*50 AS jumpX1, (((q1.quadrant_y - 1)*30)+s1.system_Y)*50 AS jumpZ1,(((q2.quadrant_x - 1)*30)+s2.system_x)*50 AS jumpX2,(((q2.quadrant_y - 1)*30)+s2.system_y)*50 AS jumpZ2 FROM wcrs_system s1, wcrs_jump j, wcrs_system s2,wcrs_quadrant q1,wcrs_quadrant q2 WHERE s1.system_id = j.system_id_1 AND s1.quadrant_id = q1.quadrant_id AND  s2.system_id = j.system_id_2 AND s2.quadrant_id = q2.quadrant_id;";
		$queryList[4][1] = "jump";
		
		$json = '';
		
		foreach ($queryList as $b) {		
		$this->content_html .= '<p>';
				if ($Recordset = $this->_database->query($b[0])) {			
					$rows = array();
					while ($row = $Recordset->fetch_assoc()) {
						$rows[] = $row;				
					}
					$this->content_html .= 'var '. $b[1].'List = {'. $b[1] .'s:'.stripslashes(json_encode($rows)).'};';
					$json .= 'var '. $b[1].'List = {'. $b[1] .'s:'.stripslashes(json_encode($rows)).'};';

					/* free result set */
					$Recordset->free();
				}
				//$json .= '\\r\\n';
				$this->content_html .= '<p/>';
		}
		
		$filename = 'js/data.js';
		if (is_writable($filename)) {

			// Wir öffnen $filename im "Anhänge" - Modus.
			// Der Dateizeiger befindet sich am Ende der Datei, und
			// dort wird $somecontent später mit fwrite() geschrieben.
			if (!$handle = fopen($filename, "w")) {
				 updateNotification($filename, 'Kann die Datei nicht öffnen',1);
				 exit;
			}

			// Schreibe $somecontent in die geöffnete Datei.
			if (!fwrite($handle, $json)) {
				updateNotification($filename, 'Kann die Datei nicht schreiben',1);
				exit;
			}
			updateNotification($filename, 'Datei wurde beschrieben',0);

			fclose($handle);

		} else {
			updateNotification($filename, 'Die Datei ist nicht schreibbar',1);
		}
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
            $page = new _Jump();
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
_Jump::main();

// Zend standard does not like closing php-tag!
// PHP doesn't require the closing tag (it is assumed when the file ends). 
// Not specifying the closing ? >  helps to prevent accidents 
// like additional whitespace which will cause session 
// initialization to fail ("headers already sent"). 
//? >