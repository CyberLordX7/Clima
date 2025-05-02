<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentControlelr extends Controller
{
    public function index()
    {
        return Inertia::render('Payments/Payments');
    }
}
