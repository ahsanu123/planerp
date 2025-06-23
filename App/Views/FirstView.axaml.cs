using Avalonia.Markup.Xaml;
using Avalonia.ReactiveUI;
using Bricker.ViewModels;
using ReactiveUI;

namespace Bricker.Views;

public partial class FirstView : ReactiveUserControl<FirstViewModel>
{
    public FirstView()
    {
        this.WhenActivated(disposable => { });
        AvaloniaXamlLoader.Load(this);
    }

}

