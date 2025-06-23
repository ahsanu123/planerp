using System;
using ReactiveUI;

namespace Bricker.ViewModels;

public class FirstViewModel : ReactiveObject, IRoutableViewModel
{
    public IScreen HostScreen { get; }

    public string? UrlPathSegment { get; } = Guid.NewGuid().ToString().Substring(0, 6);

    public FirstViewModel(IScreen screen) => HostScreen = screen;
}
