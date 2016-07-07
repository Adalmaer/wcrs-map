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
        // to do: fetch data for this view from the database
		$query ="SELECT jump_id AS jumpId, system_id_1 AS systemId1, system_id_2 AS systemId2, jump_status AS jumpStatus FROM wcrs_jump ORDER BY jump_id DESC;";
		if ($Recordset = $this->_database->query($query)) {
			$a = array();
			$a[0][0] = "jumpId";$a[0][1]='JumpID';$a[0][2]='jumpId';
			$a[1][0] = "systemId1";$a[1][1] = "System 1";$a[1][2] = "systemId1";
			$a[2][0] = "systemId2";$a[2][1] = "System 2";$a[2][2] = "systemId2";
			$a[3][0] = "jumpStatus";$a[3][1] = "Status";$a[3][2] = "jumpStatus";
			$this->content_html .= createTable($Recordset,$a,'Jumps','addJump','editJump','deleteJump');
			
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
		if (isset($_POST['addJump'])) {
			$arguments[0] = $this->_database->real_escape_string($_POST['systemId1']);
			$arguments[1] =  $this->_database->real_escape_string($_POST['systemId2']);
			$arguments[2] =  $this->_database->real_escape_string($_POST['jumpStatus']);
			insertJump($arguments, $this->_database);		
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