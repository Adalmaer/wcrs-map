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
class _Fleet extends Page
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
        // to do: fetch data for this view from the database
		$query ="SELECT fleet_id AS fleetId, fleet_name AS fleetName, faction_id AS factionId, fleet_image AS fleetImage, system_id AS systemId, fleet_status AS fleetStatus FROM wcrs_fleet ORDER BY fleet_id DESC;";
		if ($Recordset = $this->_database->query($query)) {
			$a = array();
			$a[0][0] = "fleetId";$a[0][1]='FlotteID';$a[0][2]='fleetId';$a[0][3]=2;
			$a[1][0] = "fleetName";$a[1][1] = "Name";$a[1][2] = "fleetName";$a[1][3]=2;
			$a[2][0] = "factionId";$a[2][1] = "FaktionID";$a[2][2] = "factionId";$a[2][3]=2;
			$a[3][0] = "fleetImage";$a[3][1] = "Bild";$a[3][2] = "fleetImage";$a[3][3]=2;
			$a[4][0] = "systemId";$a[4][1] = "SystemID";$a[4][2] = "systemId";$a[4][3]=2;
			$a[5][0] = "fleetStatus";$a[5][1] = "Status";$a[5][2] = "fleetStatus";$a[5][3]=1;
			$this->content_html .= createTable($Recordset,$a,'Flotten','addFleet','editFleet','deleteFleet');
			
			/* free result set */
			$Recordset->free();
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
		if (isset($_POST['addFleet'])) {
			$arguments[0] = $_POST['fleetName'];
			$arguments[1] = $_POST['factionId'];
			$arguments[2] = $_POST['fleetImage'];
			$arguments[3] = $_POST['systemId'];
			$arguments[4] = $_POST['fleetStatus'];
			
			if (strlen($arguments[0])>0 && $arguments[1]>0 && strlen($arguments[2])>0 && $arguments[3]>0 && $arguments[4]>=0)
			{
				insertFleet($arguments, $this->_database);
			}
		}else{
			if (isset($_POST['editFleet'])) {
				$arguments[0] = $_POST['fleetName'];
				$arguments[1] = $_POST['factionId'];
				$arguments[2] = $_POST['fleetImage'];
				$arguments[3] = $_POST['systemId'];
				$arguments[4] = $_POST['fleetStatus'];
				$arguments[5] = $_POST['fleetId'];
				
				if (strlen($arguments[0])>0 && $arguments[1]>0 && strlen($arguments[2])>0 && $arguments[3]>0 && $arguments[4]>=0 &&  $arguments[5]>0)
				{
					editTemplate($arguments, $this->_database,'Flotte');	
				}	
				
			}
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
            $page = new _Fleet();
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
_Fleet::main();

// Zend standard does not like closing php-tag!
// PHP doesn't require the closing tag (it is assumed when the file ends). 
// Not specifying the closing ? >  helps to prevent accidents 
// like additional whitespace which will cause session 
// initialization to fail ("headers already sent"). 
//? >