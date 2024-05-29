using AutoMapper;
using UKG.Backend.Models;

namespace UKG.Backend.Mapper;

public class MapperConfiguration : Profile
{
    public MapperConfiguration()
    {
        CreateMap<Storage.Models.UkgSummary, UkgSummary>()
            .ForMember(x => x.FirstName, opt => opt.MapFrom(x => x.Patient.FirstName))
            .ForMember(x => x.LastName, opt => opt.MapFrom(x => x.Patient.LastName))
            .ForMember(x => x.Birthday, opt => opt.MapFrom(x => x.Patient.Birthday))
            .ForMember(x => x.Pesel, opt => opt.MapFrom(x => x.Patient.Pesel));
        CreateMap<Storage.Models.UkgSummary, UkgSimple>()
            .ForMember(x => x.Id, opt => opt.MapFrom(x => x.ID));
        CreateMap<Storage.Models.Patient, PatientSimple>();
    }

}