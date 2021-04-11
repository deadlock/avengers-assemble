import { AxiosInstance } from "axios";
import axiosInstance from "./config";

class Driver {
  public constructor(
    private readonly httpClient: AxiosInstance = axiosInstance
  ) {}

  public async getCharacters(
    pagination?: Pagination,
    query?: Query
  ): Promise<CharactersResponse> {
    const result = await this.httpClient.get("/characters?", {
      params: {
        limit: pagination?.limit,
        offset: pagination?.offset,
        name: query?.name,
      },
    });
    return result.data;
  }

  public async getBiography(id: string): Promise<CharacterResponse> {
    const result = await this.httpClient.get(`/characters/${id}`);
    return result.data;
  }

  public getCharacterSeries = async (
    pagination: Pagination,
    id: string
  ): Promise<SeriesResponse> => {
    const result = await this.httpClient.get(`/characters/${id}/series`, {
      params: {
        limit: pagination?.limit,
        offset: pagination?.offset,
      },
    });
    return result.data;
  };
}

export default new Driver();
