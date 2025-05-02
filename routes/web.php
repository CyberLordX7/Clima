<?php

use App\Http\Controllers\AlarmSettingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PaymentControlelr;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TransferController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'customer'])->middleware(['auth'])->name('customer.dashboard');
// Route::get('/admin/dashboard', [DashboardController::class, 'admin'])->middleware(['auth'])->name('customer.dashboard');
Route::get('/analytics', [DashboardController::class, 'customer_analytics'])->name('customer.analytics');

Route::middleware('auth')->group(function () {
    Route::get('/alarm-settings', [AlarmSettingController::class, 'show'])->name('customer.alarm');
    Route::post('/alarm-settings', [AlarmSettingController::class, 'update']);
    Route::get('/next-alarm', [AlarmSettingController::class, 'nextAlarm']);
});


Route::get('/transfers', [TransferController::class, 'index'])->middleware(['auth'])->name('customer.transfers');
Route::get('/payments', [PaymentControlelr::class, 'index'])->name('payments');


Route::get('/settings/customer', [SettingsController::class, 'customer'])->middleware(['auth'])->name('customer.settings');
Route::get('/settings/admin', [SettingsController::class, 'admin'])->middleware(['auth'])->name('admin.settings');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
