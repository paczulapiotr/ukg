using AutoMapper;
using UKG.Backend.Models;

namespace UKG.Backend.Mapper;

public class MapperConfiguration : Profile
{
    public MapperConfiguration()
    {
        CreateMap<Storage.Models.UkgSummary, UkgSummary>()
            .ReverseMap();
        CreateMap<Storage.Models.UkgSummary, UkgSimple>()
            .ForMember(x => x.Created, opt => opt.MapFrom(x => x.CreatedAt))
            .ForMember(x => x.Updated, opt => opt.MapFrom(x => x.UpdatedAt))
            .ForMember(x => x.Id, opt => opt.MapFrom(x => x.ID));
        CreateMap<Storage.Models.Patient, PatientSimple>();
    }

}