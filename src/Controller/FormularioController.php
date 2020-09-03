<?php
// src/Controller/LuckyController.php
namespace App\Controller;

use SimpleXMLElement;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Dompdf\Dompdf;
use Dompdf\Options;
use mysqli;

class FormularioController extends AbstractController
{
    /**
     * @Route("/formulario", name="formulario", methods={"GET"})
     */
    public function index(Request $request)
    {
        // $map_url = 'http://212.225.255.130:8010/ws/accesotec/'.$request->query->get('user', '0').'/'.$request->query->get('dni', '0').'';
        $user = $request->query->get('user');
        $dni = $request->query->get('dni');

        $map_url = 'http://212.225.255.130:8010/ws/accesotec/' . $user . '/' . $dni . '';

        $response = simplexml_load_string(file_get_contents($map_url));

        $nombre = (string)$response->Registro[0]['Nombre'];
        $email = (string)$response->Registro[0]['Email'];


        return $this->render('formulario.html.twig', [
            'nombre' => $nombre,
            'email' => $email
        ]);
    }

    /**
     * @Route("/formulario/send", name="formulario_send", methods={"GET"})
     */
    public function send_data(Request $request)
    {
        $name = $request->query->get('name');
        $email = $request->query->get('email');

        $options  = new Options();
        $options->set('defaultFont', 'Roboto');


        $dompdf = new Dompdf($options);

        $html = $this->renderView('pdf/pdfTemplate.html.twig', [
            'name' => $name,
            'email' => $email
        ]);


        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        $dompdf->stream("justificante.pdf", [
            "Attachment" => true
        ]);

        $this->save_data($name, $email);
    }

    function save_data($name, $email)
    {
        $servername = "localhost";
        $username = "admin";
        $password = "1234";
        $dbname = "ptv";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("No se pudo establecer la conexión: " . $conn->connect_error);
        }

        $sql = "INSERT INTO ptv_clientes (nombre, email, firma) VALUES ('.$name.', '.$email.', 'base64img')";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
    }
}
