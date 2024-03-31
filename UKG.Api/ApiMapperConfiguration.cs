using AutoMapper;
using UKG.Api.Models;

namespace UKG.Api;

public class ApiMapperConfiguration : Profile
{
    public ApiMapperConfiguration()
    {
        CreateMap<Backend.Models.UkgSummary, AddUkgModel>().ReverseMap();
    }

}
