declare namespace NodeJS {
    interface Process {
        emit(event: 'update:user', data: any): boolean;
    }
}