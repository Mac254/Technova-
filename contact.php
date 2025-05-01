<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    if ($name && $email && $message && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // In a real application, you would:
        // 1. Save to a database
        // 2. Send an email notification
        // 3. Integrate with a CRM
        // For demonstration, we'll just return a success message
        $response = [
            'status' => 'success',
            'message' => 'Thank you, ' . htmlspecialchars($name) . '! Your message has been received.'
        ];
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Please fill out all fields correctly.'
        ];
    }
} else {
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method.'
    ];
}

echo json_encode($response);
?>