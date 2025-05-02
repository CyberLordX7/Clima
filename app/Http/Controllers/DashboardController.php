<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function customer()
    {
        return Inertia::render('Dashboard/Customer/CustomerDashboard');
    }

    public function admin()
    {
        return Inertia::render('Dashboard/Admin/AdminDashboard');
    }
    public function customer_analytics()
    {
        return Inertia::render('Analytics/Analytics');
    }
}
