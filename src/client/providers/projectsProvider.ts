import {Project, OperationResult, CreateProjectRequest, CreateProjectResponse} from "../models";
import {UserService} from "../../services";

export class ProjectsProvider {
    userService: UserService;
    apiUrl: string;

    constructor(userService: UserService, apiUrl: string) {
        this.userService = userService;
        this.apiUrl = apiUrl;
    }

    public async getAllProjects(): Promise<Project[]> {
        const url = this.apiUrl + '/projects';
        const options: RequestInit = {
            method: "GET",
            headers: {
                'Accept': "application/json",
                'Authorization': "Bearer " + await this.userService.getToken()
            }
        };

        let operationResult: OperationResult<Project[]>;

        const response = await fetch(url, options);
        if (response.status >= 200 && response.status < 300) {
            operationResult = await response.json();
        } else {
            throw response;
        }

        if (operationResult.isSuccessful)
            return operationResult.value!;
        throw Error(operationResult.error);
    }

    public async createProject(createProjectRequest: CreateProjectRequest): Promise<CreateProjectResponse> {
        const url = this.apiUrl + '/projects';
        const options: RequestInit = {
            method: "POST",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'Authorization': "Bearer " + await this.userService.getToken()
            },
            body: JSON.stringify(createProjectRequest)
        };

        let operationResult: OperationResult<CreateProjectResponse>;

        const response = await fetch(url, options);
        if (response.status >= 200 && response.status < 300) {
            operationResult = await response.json();
        } else {
            throw response;
        }

        if (operationResult.isSuccessful)
            return operationResult.value!;

        throw Error(operationResult.error);
    }
}
