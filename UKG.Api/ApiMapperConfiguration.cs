using AutoMapper;
using UKG.Api.Models;
using UKG.Backend.Models;

namespace UKG.Api;

public class ApiMapperConfiguration : Profile
{
    public ApiMapperConfiguration()
    {
        CreateMap<UkgSummary, AddUkgModel>().ReverseMap();
        CreateMap<UkgSummary, EditUkgModel>().ReverseMap();
        CreateMap<AddPatientModel, PatientSimple>();
        CreateMap<UpdatePatientModel, PatientSimple>();
    }
}
