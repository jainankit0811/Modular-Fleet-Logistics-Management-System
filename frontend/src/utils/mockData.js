export const MOCK_VEHICLES = [
    {
        id: '1',
        name: 'Heavy Duty Volvo FH16',
        plateNumber: 'GA-01-AX-1234',
        type: 'Truck',
        status: 'Active',
        capacity: '25 Tons',
        lastService: '2024-01-15',
        mileage: '45,200 km'
    },
    {
        id: '2',
        name: 'Mercedes-Benz Sprinter',
        plateNumber: 'MH-12-RT-5678',
        type: 'Van',
        status: 'In Service',
        capacity: '3.5 Tons',
        lastService: '2024-02-01',
        mileage: '12,800 km'
    },
    {
        id: '3',
        name: 'Scania R500',
        plateNumber: 'KA-05-MN-9012',
        type: 'Truck',
        status: 'Active',
        capacity: '18 Tons',
        lastService: '2023-12-20',
        mileage: '88,400 km'
    },
    {
        id: '4',
        name: 'Tesla Semi (Prototype)',
        plateNumber: 'DL-01-EV-0001',
        type: 'Truck',
        status: 'Out of Order',
        capacity: '36 Tons',
        lastService: '2024-02-10',
        mileage: '2,100 km'
    },
    {
        id: '5',
        name: 'Ford Transit',
        plateNumber: 'UP-32-BK-4321',
        type: 'Van',
        status: 'Active',
        capacity: '2.8 Tons',
        lastService: '2024-01-30',
        mileage: '34,500 km'
    }
];

export const MOCK_DRIVERS = [
    {
        id: '1',
        name: 'Rajesh Kumar',
        licenseNumber: 'DL-1420200001234',
        phone: '+91 98765 43210',
        status: 'Available',
        licenseExpiry: '2025-08-12',
        rating: 4.8,
        experience: '8 Years'
    },
    {
        id: '2',
        name: 'Suresh Raina',
        licenseNumber: 'UP-3220190005678',
        phone: '+91 87654 32109',
        status: 'On Trip',
        licenseExpiry: '2024-11-20',
        rating: 4.5,
        experience: '5 Years'
    },
    {
        id: '3',
        name: 'Amit Shah',
        licenseNumber: 'GJ-0120210009012',
        phone: '+91 76543 21098',
        status: 'On Leave',
        licenseExpiry: '2024-05-15',
        rating: 4.2,
        experience: '12 Years'
    },
    {
        id: '4',
        name: 'Vikram Singh',
        licenseNumber: 'HR-2620220003456',
        phone: '+91 65432 10987',
        status: 'Available',
        licenseExpiry: '2026-02-28',
        rating: 4.9,
        experience: '10 Years'
    }
];

export const MOCK_ROUTES = [
    {
        id: 'R-1',
        vehicleId: 'GA-01-AX-1234',
        driverName: 'Rajesh Kumar',
        origin: 'Panaji Port',
        destination: 'Margao Industrial Estate',
        progress: 65,
        status: 'In Transit',
        eta: '14:30',
        startTime: '10:00',
        distance: '34 km'
    },
    {
        id: 'R-2',
        vehicleId: 'MH-12-RT-5678',
        driverName: 'Suresh Raina',
        origin: 'JNPT Mumbai',
        destination: 'Pune Distribution Center',
        progress: 88,
        status: 'Near Destination',
        eta: '12:15',
        startTime: '08:30',
        distance: '150 km'
    },
    {
        id: 'R-3',
        vehicleId: 'KA-05-MN-9012',
        driverName: 'Vikram Singh',
        origin: 'Bangalore Hub',
        destination: 'Mysore Warehouse',
        progress: 20,
        status: 'Delayed',
        eta: '18:45',
        startTime: '15:20',
        distance: '145 km'
    },
    {
        id: 'R-4',
        vehicleId: 'UP-32-BK-4321',
        driverName: 'Sushil Kumar',
        origin: 'Lucknow Depot',
        destination: 'Kanpur Terminal',
        progress: 0,
        status: 'Loading',
        eta: '16:00',
        startTime: '14:15',
        distance: '90 km'
    }
];

export const VEHICLE_TYPES = ['Truck', 'Van', 'Car', 'Trailer'];
export const VEHICLE_STATUSES = ['Active', 'In Service', 'Out of Order', 'Retired'];
export const DRIVER_STATUSES = ['Available', 'On Trip', 'On Leave', 'Suspended'];
export const ROUTE_STATUSES = ['In Transit', 'Near Destination', 'Delayed', 'Loading', 'Completed'];
