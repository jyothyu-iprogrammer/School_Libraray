// src/Dashboard/dashboard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    // Endpoint to get dashboard data
    @Get()
    async getDashboardData() {
        return this.dashboardService.getDashboardData();
    }
}
