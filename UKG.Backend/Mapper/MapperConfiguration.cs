using AutoMapper;

namespace UKG.Backend.Mapper;

public class MapperConfiguration : Profile
{
    public MapperConfiguration()
    {
        CreateMap<Storage.Models.UKGSummary, Models.UKGSummary>().ReverseMap();
    }

}