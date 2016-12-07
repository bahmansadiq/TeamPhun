using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamPhun_API.Interfaces
{
    interface IGenericRepository
    {
        //The IGenericRepository interface is a generic interface that defines the same set of methods as before. Notice that this time instead of Customer entity it uses T everywhere. Also notice that SelectByID() and Delete() methods now accept object parameter instead of string. This is necessary because different tables may have different types of primary keys (Customers table has a string primary key whereas Employees table has an integer primary key).
        IEnumerable<T> SelectAll();
        T SelectByID(object id);
        void Insert(T obj);
        void Update(T obj);
        void Delete(object id);
        void Save();
    }
}
